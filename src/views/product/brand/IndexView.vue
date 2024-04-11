<template>
    <el-card>
        <el-button type="primary" @click="addBrand">+ 添加品牌</el-button>
    </el-card>
    <el-table border :data="brandArr">
        <el-table-column type="index" label="品牌序号" width="90px" align="center"></el-table-column>
        <el-table-column prop="tmName" label="品牌名称"></el-table-column>
        <el-table-column label="品牌LOGO">
            <template #default="scope">     <!-- 会回传三个参数(文档有写) -->
                <img :src="scope.row.logoUrl" width="100px;">
            </template>
        </el-table-column>
        <el-table-column label="品牌操作">
            <template v-slot="scope">
                <el-button @click="updateBrand(scope.row)" type="primary" icon="Edit" circle></el-button>
                <el-popconfirm :title="`你确定要删除${scope.row.tmName}吗?`" width="240px" icon="Delete" @confirm="deleteBrand(scope.row.id)" cancel="">
                    <template #reference>
                        <el-button type="warning" icon="Delete" circle></el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNumber" v-model:page-size="pageSize" 
        :total=total layout="prev,pager,next,jumper,->,sizes,total" background
        @current-change="changePageNumber" @size-change="sizeChange"/>

    <el-dialog v-model="dialogVisable" :title="dialogTitle">
        <el-form style="width: 80%; margin: 0 auto;" :model="brandParams" ref="formRef" :rules="rules">  <!--表单校验第一步，用model告诉数据收集到了谁身上-->
            <el-form-item label="品牌名称" label-width="100px" prop="tmName">    <!--表单校验第二步，加上prop-->
                <el-input placeholder="输入品牌名称" v-model="brandParams.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                <!-- action是请求url, 必须加有api，否则不处理请求 -->
                <el-upload
                    class="avatar-uploader"
                    action="http://sph-api.atguigu.cn/admin/product/fileUpload"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="brandParams.logoUrl" :src="brandParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" @click="cancel">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { BrandResponseData, Record, reqAddOrUpdateBrand, reqDeleteBrand, reqGetHasBrand } from '@/api/product/brand';
import { ElMessage, UploadProps } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';

const pageNumber = ref(1)   //  页码
const pageSize = ref(3)     //  每页展示数据的个数
const total = ref(0)
const brandArr = ref<Record[]>([])    //  表格数据

const dialogVisable = ref(false) //  对话框是否显示
const dialogTitle = ref('')     //  对话框标题

const formRef = ref()

const brandParams = reactive<Record>({
    tmName: '',
    logoUrl: '',
})

const getBrand = async () => {
    const result:BrandResponseData = await reqGetHasBrand(pageNumber.value, pageSize.value);
    if(result.code === 200){
        total.value = result.data.total
        brandArr.value = result.data.records;
    }
}

const changePageNumber = async (pager = 1)=>{  //  当前页码也是作为参数，这里隐式显示
    pageNumber.value = pager;
    getBrand()
}

const sizeChange = async () => {  //  下拉菜单变化的时候触发，数据隐式了
    pageNumber.value = 1;
    getBrand()
}

const addBrand = () => {
    brandParams.tmName = brandParams.logoUrl = ''
    dialogVisable.value = true
    dialogTitle.value = "添加品牌"
    brandParams.id = 0
    formRef.value?.clearValidate('tmName')  //  清楚错误信息
    formRef.value?.clearValidate('logoUrl')
}

const deleteBrand = async (id:number) => {
    const result = await reqDeleteBrand(id);
    if(result.code===200)   {
        getBrand();
        ElMessage({type:'success', message: '删除成功'});
        changePageNumber(brandArr.value.length > 1 ? pageNumber.value : pageNumber.value -1)
    }
    else    ElMessage.error("删除失败")
}

const updateBrand = (row:Record) => {
    Object.assign(brandParams, row)     //  ES6语法，将两个对象合并
    dialogVisable.value = true
    dialogTitle.value = "修改品牌"
}

const cancel = () => {
    dialogVisable.value = false;
}

const confirm = async () => {
    await formRef.value.validate()     //  校验不通过后续代码不执行，单词别写错了！
    const result = await reqAddOrUpdateBrand(brandParams);
    console.log(result)
    if(result.code === 200) {
        ElMessage({type: 'success', message: brandParams.id ? '修改品牌成功' : '添加品牌成功'});
        getBrand();
    }   else    {
        ElMessage.error(brandParams.id ? '修改品牌失败' : '添加品牌失败');
    }
    dialogVisable.value = false;
}

const beforeAvatarUpload:UploadProps['beforeUpload'] = (rawFile) => {
    if(rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type=='image/gif')    {
        if(rawFile.size/1024/1024 <4)   return true;
    }   else    {
        ElMessage.error("头像必须为jpg格式");
        return false;
    }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    //  response是这次上传图片post请求服务器返回的数据
    //  收集图片上传图片的地址，添加一个新品牌的时候带给服务器（就是你上传文件后，服务器告诉你怎么访问到这张图片，地址是多少）
    brandParams.logoUrl = response.data;
} 

const validatorTmName = (rule:any, value:string, callback:any) => {   //  传入规则对象、数据内容、
    //  表单元素失去焦点时，触发此方法
    if(value.trim().length >= 2)  callback();     //  校验通过
    else    callback(new Error('品牌名称应该大于等于两位'))     //  校验失败
}

const validatorLogoUrl = (rule:any, value:string, callback:any) => {
    console.log(147, value)
    if(value)   callback();
    else        callback(new Error("图片务必上传"))
}

const rules = {
    tmName: [
        { required: true, trigger: 'blur', validator: validatorTmName }     //  表单失去焦点时校验
    ],
    logoUrl: [
        { required: true, trigger: 'change', validator: validatorLogoUrl }
    ]
}

onMounted(()=>{
    getBrand();
})
</script>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
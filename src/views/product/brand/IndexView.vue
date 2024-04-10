<template>
    <el-card>
        <el-button type="primary" @click="addBrand">+ 添加品牌</el-button>
    </el-card>
    <el-table border :data="brandArr">
        <el-table-column type="index" label="品牌序号" width="90px" align="center"></el-table-column>
        <el-table-column prop="tmName" label="品牌名称"></el-table-column>
        <el-table-column label="品牌LOGO">
            <template v-slot="{ row }">     <!-- 会回传三个参数(文档有写) -->
                <img :src="row.logoUrl" width="100px;">
            </template>
        </el-table-column>
        <el-table-column label="品牌操作">
            <template #>
                <el-button @click="updateBrand" type="primary" icon="Edit" circle></el-button>
                <el-button @click="deleteBrand" type="warning" icon="Delete" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNumber" v-model:page-size="pageSize" 
        :total=total layout="prev,pager,next,jumper,->,sizes,total" background
        @current-change="changePageNumber" @size-change="sizeChange"/>

    <el-dialog v-model="dialogVisable" :title="dialogTitle">
        <el-form style="width: 80%; margin: 0 auto;">
            <el-form-item label="品牌名称" label-width="80px">
                <el-input placeholder="输入品牌名称" v-model="brandParams.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="80px">
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
import { BrandResponseData, Record, reqGetHasBrand } from '@/api/product/brand';
import { ElMessage, UploadProps } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';

const pageNumber = ref(1)   //  页码
const pageSize = ref(3)     //  每页展示数据的个数
const total = ref(0)
const brandArr = ref<Record[]>([])    //  表格数据

const dialogVisable = ref(false) //  对话框是否显示
const dialogTitle = ref('')     //  对话框标题

const brandParams = reactive<Record>({
    tmName: '',
    logoUrl: '',
})

const getBrand = async () => {
    const result:BrandResponseData = await reqGetHasBrand(pageNumber.value, pageSize.value);
    console.log(result)
    if(result.code === 200){
        total.value = result.data.total
        brandArr.value = result.data.records;
        console.log(brandArr.value)
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
    dialogVisable.value = true
    dialogTitle.value = "添加品牌"
}

const deleteBrand = () => {
    dialogVisable.value = true
    dialogTitle.value = "删除品牌"
}

const updateBrand = () => {
    dialogVisable.value = true
    dialogTitle.value = "修改品牌"
}

const cancel = () => {
    dialogVisable.value = false;
}

const confirm = () => {
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
    //  收集图片上传图片的地址，添加一个新品牌的时候带给服务器
    brandParams.logoUrl = response.data;
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
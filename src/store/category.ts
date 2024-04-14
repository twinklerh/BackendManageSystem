import { CategoryObj, CategoryResponseData, reqC2, reqC3 } from "@/api/product/attr";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore('category', {
    state() {
        return {
            c1Id: '' as number|string,
            c1Arr: [] as CategoryObj[],
            c2Id: '' as number|string,
            c2Arr: [] as CategoryObj[],
            c3Id: '' as number|string,
            c3Arr: [] as CategoryObj[],
        }
    },
    actions: {
        async changeHappenOnFirstSelect() {  //  获得第二个el-select的数据
            const result:CategoryResponseData = await reqC2(this.c1Id);
            this.c2Arr = result.data;
            this.c3Id = this.c2Id = '';
        },
        async changeHappenOnSecondSelect() {  //  获得第三个el-select的数据
            const result = await reqC3(this.c2Id);
            this.c3Arr = result.data;
            this.c3Id = ''
        }
    }
})
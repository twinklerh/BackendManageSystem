import { CategoryObj } from "@/api/product/attr";
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
    }
})
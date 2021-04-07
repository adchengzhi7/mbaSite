<template>
    <div>
        <customTable>
            <template #caption>
                <caption>
                    <span v-if ="studentList">
                      {{studentList.length }}
                    </span>
                    <span style="float:right">

                        <button class="btn btn-light" @click="prevPage" :disabled="currentPage == 1" ><i class="fas fa-arrow-left"></i></button>
                        <button class="btn btn-light" @click="nextPage" :disabled="currentPage == prevPageStatus" ><i class="fas fa-arrow-right"></i></button>
                    </span>
                </caption>
            </template>
            <template #thead>
                  <tr>
                    <th @click ="sortBy = 'id',isReverse = !isReverse"  scope="col">
                        <span :class="{'title-green':sortBy =='id'}">

                        </span>

                    </th>
                    <th  scope="col">姓名</th>
                    <th @click ="sortBy = 'stuId',isReverse = !isReverse " scope="col">
                        <span :class="{'title-green':sortBy =='stuId'}">
                            Email
                            <i v-if="sortBy =='stuId' && isReverse== false" class="fas fa-sort-down"></i>
                            <i v-else-if="sortBy == 'stuId' && isReverse== true" class="fas fa-sort-up"></i>
                            <i v-else class="fas fa-sort"></i>
                        </span>
                    </th>
                    <th @click ="sortBy = 'totalPoint',isReverse = !isReverse, sorttotalPoint= !sorttotalPoint" scope="col">
                        <span :class="{'title-green':sortBy =='totalPoint'}"> 證號
                        <i v-if="sortBy =='totalPoint' && isReverse== false" class="fas fa-sort-down"></i>
                        <i v-else-if="sortBy == 'totalPoint' && isReverse== true" class="fas fa-sort-up"></i>
                        <i v-else class="fas fa-sort"></i>
                        </span> 
                        </th>
                    <th>
學號
                    </th>
                </tr>
            </template>
            <template #tbody>
                <tr class="bg-shadow-hover rounded" :key="'THT'+index" v-for="(item,index) in studentList">
                    <th scope="row">{{}}</th>
                    <td   v-html="(item.name)"></td>
                    <td  v-html="(item.email)"></td>
                    <td  v-html="(item.personalid)"></td>
                    <td> {{item.studentid}}</td>
                </tr>
            </template>
        </customTable>
    </div>
</template>
<script>
import customTable from "./tmp-table"
export default {
    name:"importtable",
    props:["filter","studentList"],
    components:{
        customTable
    },
    methods: {
       
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.studentList.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    }
    },
    computed:{
        prevPageStatus(){
            let vm =this;
            if(vm.studentList){
                const totalPage =vm.studentList.length/vm.pageSize
                return Math.ceil(totalPage)
            }
            return 0
        },
      


    },
    data() {
        return {
            sortBy :'cName',
            isReverse:'false',
            sortId:true,
            sortstuId:false,
            sorttotalPoint:false,
            pageSize:10,
            currentPage:1,
           
        }
    },
    
}
</script>
<style scoped>
.table td, .table th {
    border-top: 0px !important;
    border-bottom-width:0px !important;

}
.table {
    border-collapse: separate;
    border-spacing: 0px 0.5rem;
}
.table thead th {
    border-bottom: 0px;
    font-weight:900px;
    font-size: 14px;
    color:#c0c0c0;
}
table tbody tr:hover {
    background-color:var(--hoverBgColor);

}

a{
    color:var(--green);
    font-weight:900;
}


</style>
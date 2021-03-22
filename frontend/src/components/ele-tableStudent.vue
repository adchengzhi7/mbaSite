<template>
    <div>
        <customTable>
           
            <template #thead>
                  <tr>
                    <th :key="th.key" v-for="th in thead" @click ="sortSelector(th.id,th.isSort)"  scope="col">
                        <span :class="{'title-green':sortBy == th.id}">
                            {{th.title}}
                            <i v-if="sortBy == th.id && isReverse== false" class="fas fa-sort-down"></i>
                            <i v-else-if="sortBy == th.id && isReverse== true" class="fas fa-sort-up"></i>
                            <span v-else-if="!th.isSort"></span>
                            <i v-else class="fas fa-sort"></i>
                        </span>

                    </th>
                
                    <th></th>
                </tr>
            </template>
            <template #tbody>
                <tr class="bg-shadow-hover rounded" :key="item.id" v-for="item in filterData">
                    <th scope="row">{{item.id}}</th>
                    <td   v-html="(item.section)"></td>
                    <td  v-html="(item.point)"></td>
                    <td  v-html="(item.status)"></td>
                    <td> <router-link to="/">查看</router-link></td>
                </tr>
            </template>
        </customTable>
    </div>
</template>
<script>
import customTable from "./tmp-table"
export default {
    components:{
        customTable
    },
    methods: {
     sortSelector(selected,isSort){
         let vm = this;
         if(isSort){
              vm.sortBy = selected;
              vm.isReverse = !vm.isReverse;
         }else{
              vm.sortBy = "";
         }
     }
    },
    computed:{
       
        filterData(){
            let vm =this;
            return vm.nameList.sort(function(a, b) {
                if (!vm.isReverse) {
                return a[vm.sortBy] - b[vm.sortBy];
                } else {

                return b[vm.sortBy] - a[vm.sortBy];
                }
            });
            
           
        }

    },
    data() {
        return {
            filter:"",
            sortBy :'id',
            isReverse:false,
            thead:
                [
                {key:'th01',id:"id",title:"#",isSort:true},
                {key:'th02',id:"section",title:"項目",isSort:false},
                {key:'th03',id:"point",title:"點數",isSort:true},
                {key:'th04',id:"status",title:"狀態",isSort:true},
                ],
            nameList:[
                {
                    id:"1",
                    section:"李政治",
                    point:"10540592",
                    status:"5"
                },
                {
                    id:"2",
                    section:"黃昏後",
                    point:"106301042",
                    status:"4"
                },
                {
                    id:"3",
                    section:"Aarry",
                    point:"107932087",
                    status:"1"
                },
                {
                    id:"4",
                    section:"ok",
                    point:"112932098",
                    status:"2"
                },
                {
                    id:"5",
                    section:"Aarry",
                    point:"119932098",
                    status:"4"
                },{
                    id:"6",
                    section:"Aarry",
                    point:"119932098",
                    status:"4"
                },{
                    id:"7",
                    section:"Aarry",
                    point:"119932098",
                    status:"4"
                }
            ]
        }
    },
    
}
</script>
<style scoped>
.table td, .table th {
    border-top: 0px !important;
    padding:  0rem  1.75rem !important;

}
.table tbody td, .table tbody th {
    padding: 1.75rem !important;
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
.rounded {
    border-radius: .5rem!important;
}
a{
    color:var(--green);
    font-weight:900;
}



</style>
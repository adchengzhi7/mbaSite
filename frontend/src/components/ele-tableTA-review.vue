<template>
    <div>
        <customTable>
            <template #caption>
                <caption>
                    <span>
                        {{filterData.length}} of {{nameList.length }}
                    </span>
                    <span style="float:right">

                        <button class="btn btn-light" @click="prevPage" :disabled="currentPage == 1" ><i class="fas fa-arrow-left"></i></button>
                        <button class="btn btn-light" @click="nextPage" :disabled="currentPage == prevPageStatus" ><i class="fas fa-arrow-right"></i></button>
                    </span>
                </caption>
            </template>
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
                </tr>
            </template>
            <template #tbody>
                <tr class="bg-shadow-hover rounded" :key="item.id" v-for="item in filterData">
                    <th scope="row">{{item.id}}</th>
                    <td  v-html="highlightMatches(item.name)"></td>
                    <td  v-html="highlightMatches(item.stuId)"></td>
                    <td  v-html="highlightMatches(item.section)"></td>
                    <td  v-html="highlightMatches(item.semester)"></td>
                    <td> <router-link to="/">查看</router-link></td>
                </tr>
            </template>
        </customTable>
    </div>
</template>
<script>
import customTable from "./tmp-table"
export default {
    props:["filter"],
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
        },
        highlightMatches(text){
      const matchExists = text.toLowerCase().includes(this.filter.toLowerCase());
      if (!matchExists) return text;

      const re = new RegExp(this.filter,'ig');
      return text.replace(re,matchedText => `<strong class="text-success">${matchedText}</strong>`)
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.nameList.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    }
    },
    computed:{
        prevPageStatus(){
            let vm =this;
            const totalPage =vm.nameList.length/vm.pageSize
            return Math.ceil(totalPage)
        },
        filterData(){
            let vm =this;
            const filterToLower = vm.filter.toString().toLowerCase();
            const filterList=vm.nameList.filter(row => {
                const first = row.name.toString().toLowerCase();
                const last = row.stuId.toString().toLowerCase();
                const handle = row.section.toString().toLowerCase();

                return last.includes(filterToLower) || first.includes(filterToLower) || handle.includes(filterToLower)

            })
            return filterList.sort(function(a, b) {
                if (!vm.isReverse) {
                return a[vm.sortBy] - b[vm.sortBy];
                } else {
                return b[vm.sortBy] - a[vm.sortBy];
                }
            }).filter((row, index) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end) return true;
      });
        }

    },
    data() {
        return {
            sortBy :'first',
            isReverse:'false',
            sortId:true,
            sortLast:false,
            sortHandle:false,
            pageSize:5,
            currentPage:1,
            thead:
            [
            {key:'th01',id:"id",title:"#",isSort:true},
            {key:'th02',id:"name",title:"姓名",isSort:true},
            {key:'th03',id:"stuId",title:"學號",isSort:true},
            {key:'th04',id:"section",title:"項目",isSort:true},
            {key:'th05',id:"semester",title:"學期",isSort:true},
            ],
             nameList:[
                {id:"1",name:"李組長",stuId:"10540592",section:"國際交換或雙聯學位",sectionTitle:"SKEMA Business School",semester:"1091",point:"1",status:"1"},
                {id:"2",name:"李組長",stuId:"10540592",section:"國際交換或雙聯學位",sectionTitle:"SKEMA Business School",semester:"1082",point:"3",status:"2"},
                {id:"3",name:"李組長",stuId:"10540592",section:"英語檢定",sectionTitle:"TOEFL PBT",semester:"1081",point:"0",status:"2"},
            ]
            

            
        }
    },
    
}
</script>
<style scoped>
.table td, .table th {
    border-top: 0px !important;
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
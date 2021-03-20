<template>
    <div>
        <table class="table">
            <caption>{{filterData.length}} of {{nameList.length }}</caption>
  <thead>
    <tr>
      <th @click ="sortBy = 'id',isReverse = !isReverse"  scope="col">#</th>
      <th  scope="col">姓名</th>
      <th @click ="sortBy = 'last',isReverse = !isReverse" scope="col">學號</th>
      <th @click ="sortBy = 'handle',isReverse = !isReverse" scope="col">登記點數</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr class="bg-shadow rounded" :key="item.id" v-for="item in filterData">
      <th scope="row">{{item.id}}</th>
      <td   v-html="highlightMatches(item.first)"></td>
      <td  v-html="highlightMatches(item.last)"></td>
      <td  v-html="highlightMatches(item.handle)"></td>
      <td> <router-link to="/">查看</router-link></td>
    </tr>
  </tbody>
</table>        
    </div>
</template>
<script>
export default {
    props:["filter"],
    methods: {
        highlightMatches(text){
      const matchExists = text.toLowerCase().includes(this.filter.toLowerCase());
      if (!matchExists) return text;

      const re = new RegExp(this.filter,'ig');
      return text.replace(re,matchedText => `<strong class="text-success">${matchedText}</strong>`)
    }
    },
    computed:{
        filterData(){
            let vm =this;
            const filterToLower = vm.filter.toString().toLowerCase();
            const filterList=vm.nameList.filter(row => {
                const first = row.first.toString().toLowerCase();
                const last = row.last.toString().toLowerCase();
                const handle = row.handle.toString().toLowerCase();

                return last.includes(filterToLower) || first.includes(filterToLower) || handle.includes(filterToLower)

            })
            return filterList.sort(function(a, b) {
                if (!vm.isReverse) {
                return a[vm.sortBy] - b[vm.sortBy];
                } else {
                return b[vm.sortBy] - a[vm.sortBy];
                }
            });
            
            // if (vm.sort == 'last') {
            //     if(vm.isReverse ){
            //         return filterList.sort(function(a, b) {
            //             return b.last - a.last ? 1:-1;
            //     });
            //         }else{
            //              return filterList.sort(function(a, b) {
            //             return b.last - a.last ? -1:1;
            //     });
            //         }
            // }else if (vm.sort == 'handle') {
            //     return filterList.sort(function(a, b) {
            //     return b.handle - a.hendle ? 1:-1;
            //     });
            // } else if(vm.sort == 'number'){
            //     return filterList.sort(function(a, b) {
            //     return b.id - a.id ? 1:-1;
            //     });
            // }
            // else {
            //     return filterList;
            // }
        }

    },
    data() {
        return {
            sortBy :'first',
            isReverse:'false',
            nameList:[
                {
                    id:"1",
                    first:"李政治",
                    last:"10540592",
                    handle:"5"
                },
                {
                    id:"2",
                    first:"黃昏後",
                    last:"106301042",
                    handle:"4"
                },
                {
                    id:"3",
                    first:"Aarry",
                    last:"107932087",
                    handle:"1"
                },
                {
                    id:"4",
                    first:"ok",
                    last:"112932098",
                    handle:"2"
                },
                {
                    id:"5",
                    first:"Aarry",
                    last:"119932098",
                    handle:"4"
                }
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
a{
    color:var(--green);
    font-weight:900;
}


</style>
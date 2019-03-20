import {export_json_to_excel} from '../excel/vendor/Export2Excel'
export const exportExcel = (excelData, tHeader, filterVal, excelName)=>{
        // require.ensure([], () => {
        //     const { export_json_to_excel } = require('../excel/vendor/Export2Excel');
        //     const data = excelData.map(v => filterVal.map(j => v[j]));
        //     export_json_to_excel(tHeader, data, excelName);
        // })
        //const { export_json_to_excel } = import('../excel/vendor/Export2Excel')();
        const data = excelData.map(v => filterVal.map(j => v[j]));
        export_json_to_excel(tHeader, data, excelName);
    };


import Parse from "./parse-init";
import {queryListByOptions,queryCountByOptions} from "./baseApi";
import {PersonProperty,OrgSequence,DailySection} from '@/const/index'
console.log(DailySection,111)
const querySoldiersListInOrg = org=>{
    const orgQuery = new Parse.Query('Org');
    orgQuery.contains('displayName',org.displayName)
    return queryListByOptions('Soldier2',{
        matchesQuery:{
            organization:orgQuery
        }
    })
}
const querySoldiersCountInOrg = org=>{
    const orgQuery = new Parse.Query('Org');
    orgQuery.contains('displayName',org.displayName)
    return queryCountByOptions('Soldier2',{
        matchesQuery:{
            organization:orgQuery
        }
    })
}

export const getTableInfoByOrg = async org =>{
    const soldierCount = await querySoldiersCountInOrg(org)
    if(!soldierCount)return {code:0,text:'该单位下没有人员'}

    const timeStatArr = org.orgSequence < OrgSequence.Battalion ? [PersonProperty.Officer] : [PersonProperty.Soldier, PersonProperty.Officer, PersonProperty.Supporter];
    const timeStat = timeStatArr.map(type=>({
        type,
        hoursInDay: 0,
        hoursAtNight: 0,
        totalHoursInDay: 0,
        totalHoursAtNight: 0
    }))
    
    const orgCategory = org.orgSequence < OrgSequence.Battalion ? org.orgCategory+"首长机关" :  org.orgCategory
    const bulletArr = await queryListByOptions('BulletRequirement', {equalTo:{orgCategory}});
    const majorType = org.serviceType === '看守看押勤务' ? '“两看”勤务分队' :'其他勤务分队';
    const bulletStat = bulletArr.filter( ele=>ele.majorType !== majorType).map(item=>({
        type: item.ordnanceType,
        soldierNumber: 0,
        trainAverage: 0,
        train: 0,
        others: 0,
        totalTrainAverage: 0,
        totalTrain: 0,
        totalOthers: 0
    }));


    const motorArr = await queryListByOptions('MotorRequirement', {equalTo:{orgCategory:org.orgCategory}});
    const motorStat = motorArr.map(item=>({
        type: item.motorType,
        unitType: item.unitType,
        count: 0,
        total: 0
    }))

    const contentStat = Object.keys(DailySection).reduce((prev,curr)=>{
        prev[curr] = []
        return prev
    },{})
    return {
        personStat : {
            total: soldierCount,
            present: 0,
            presentRate: 0,
            notes: ''
        },
        contentStat,
        timeStat,
        bulletStat,
        motorStat
    }
}

// async getTableInfoByOrgAndDate(org, date){
//     try {
//         // 查询中队上一个日登记表数据
//         let lastReportInfo = await this.getLastReport(org.objectId, date, 'DailyReport');

//         // 初始化表格信息
//         let result = {};
//         result = this.init(result);

//         // 目标组织信息添加
//         result.targetOrg = org;

//         // 日期信息添加
//         result.date = date;

//         // 获取实力数
//         let total = 0;
//         if(org.orgSequence < OrgSequence.Battalion){
//             total = await this.getOfficeSoldierNumberByOrgIdAndDate(org, date);
//         }else{
//             total = await this.getCompanySoldierNumberByOrgIdAndDate(org, date);
//         }
//         result.personStat = {
//             total: total,
//             present: 0,
//             presentRate: 0,
//             notes: ''
//         };

//         // 获取训练内容
//         result.contentStat = {
//             earlyMoring: [],
//             morning: [],
//             afternoon: [],
//             sport: [],
//             night: []
//         };

//         // 设置填写人
//         result.createdBy = '';

//         let index = -1;

//         // 获取累计训练时间
//         let timeStat = [];
//         let soldierType = [PersonProperty.Soldier, PersonProperty.Officer, PersonProperty.Supporter];
//         if(org.orgSequence < OrgSequence.Battalion){
//             soldierType = [PersonProperty.Officer];
//         }
//         soldierType.map(ele =>
//             lastReportInfo && (index = lastReportInfo.timeStat.findIndex(item => item.type === ele)) >= 0 ?
//             timeStat.push({
//             type: ele,
//             hoursInDay: 0,
//             hoursAtNight: 0,
//             totalHoursInDay: Number(lastReportInfo.timeStat[index].totalHoursInDay),
//             totalHoursAtNight: Number(lastReportInfo.timeStat[index].totalHoursAtNight)
//         }) : timeStat.push({
//                 type: ele,
//                 hoursInDay: 0,
//                 hoursAtNight: 0,
//                 totalHoursInDay: 0,
//                 totalHoursAtNight: 0
//             }));

//         result.timeStat = timeStat;

//         // 获取训练弹药信息
//         let resultBulletInfo = await this.getRequirementByOrgCategory('BulletRequirement', org.orgCategory);
//         if(org.orgSequence < OrgSequence.Battalion){
//             resultBulletInfo = await this.getRequirementByOrgCategory('BulletRequirement', org.orgCategory+"首长机关");
//         }
//         let majorType = '其他勤务分队';
//         if (org.serviceType === '看守看押勤务') {
//             majorType = '“两看”勤务分队';
//         }
//         resultBulletInfo = resultBulletInfo.filter(function (ele) {
//             return ele.majorType !== majorType;
//         });

//         let resultBulletTypes = [];
//         for (let info of resultBulletInfo) {
//             resultBulletTypes.push(info.ordnanceType);
//         }

//         // let soldierNumberInfo = await this.getNumberByOrgCategoryAndOrdnanceType(org, resultBulletTypes, resultNumberInfo);

//         let bulletStat = [];
//         resultBulletTypes.map(ele => {
//             // let soldierNumber = soldierNumberInfo[ele] ? Number(soldierNumberInfo[ele]) : 0;
//             // if(org.orgSequence < OrgSequence.Battalion){
//             //     soldierNumber = total;
//             // }
//             // if (soldierNumber > 0) {
//             lastReportInfo && (index = lastReportInfo.bulletStat.findIndex(item => item.type === ele)) >= 0 ?
//                 bulletStat.push({
//                     type: ele,
//                     soldierNumber: 0,
//                     trainAverage: 0,
//                     train: 0,
//                     others: 0,
//                     totalTrainAverage: Number(Number(lastReportInfo.bulletStat[index].totalTrainAverage).toFixed(1)),
//                     totalTrain: Number(lastReportInfo.bulletStat[index].totalTrain),
//                     totalOthers: Number(lastReportInfo.bulletStat[index].totalOthers)
//                 }) : bulletStat.push({
//                 type: ele,
//                 soldierNumber: 0,
//                 trainAverage: 0,
//                 train: 0,
//                 others: 0,
//                 totalTrainAverage: 0,
//                 totalTrain: 0,
//                 totalOthers: 0
//             })
//             // }
//         });
//         result.bulletStat = bulletStat;

//         // 获取摩托（飞行）小时信息
//         let resultMotorInfo = await this.getRequirementByOrgCategory('MotorRequirement', org.orgCategory);
//         let motorStat = [];
//         resultMotorInfo.map(ele =>
//             lastReportInfo && (index = lastReportInfo.motorStat.findIndex(item => item.type === ele.motorType)) >= 0 ?
//             motorStat.push({
//                 type: ele.motorType,
//                 unitType: ele.unitType,
//                 count: 0,
//                 total: Number(lastReportInfo.motorStat[index].total)
//             }) : motorStat.push({
//                 type: ele.motorType,
//                 unitType: ele.unitType,
//                 count: 0,
//                 total: 0
//             }));
//         result.motorStat = motorStat;
//         return result;
//     } catch (exception) {
//         console.log(`getTableInfoByOrgAndDate failed! exception:${exception}`);
//         let result = parseUtils.getErrorMessage(exception);
//         if (this.backendService.errorHandler) this.backendService.errorHandler(exception.code, result);
//         throw result;
//     }
// }
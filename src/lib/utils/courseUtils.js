import _ from 'lodash';

export default {
    makeupCourseName: function(item) {
        if (_.isEmpty(item)) return '';

        let name = `${item.seq}. ${item.name}`;
        (item.personProperties&&item.personProperties.length===1) && (name=`${name}(${item.personProperties[0]})`);
        (item.tasks&&item.tasks.length===1) && (name=`${name}(${item.tasks[0]})`);
        (!_.isEmpty(item.serviceReq)) && (name=`${name}(${item.serviceReq.join(';')})`);
        (!_.isEmpty(item.majorReq)) &&  (name=`${name}(${item.majorReq})`);

        return name;
    }
}
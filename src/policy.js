class Arr {
    /**
     *
     * @param value
     * @param {Array} arr
     * @returns {boolean}
     */
    static inArray(value, arr) {
        for (var i = 0; i < arr.length; i++) {
            if (value === arr[i]) {
                return true;
            }
        }
        return false;
    }

    /**
     * 去重
     * @param {Array} arr
     * @returns {Array}
     */
    static unique(arr) {
        var hash = [];
        for (var i = 0; i < arr.length; i++) {
            if (hash.indexOf(arr[i]) === -1) {
                hash.push(arr[i]);
            }
        }
        return hash;
    }

    /**
     *
     * @param {Array} arr1
     * @param  {Array} arr2
     * @returns {Array}
     */
    static merge(arr1, arr2) {
        for (var i = 0; i < arr2.length; i++) {
            arr1.push(arr2[i]);
        }
        return arr1;
    }
}
export default class Policy {
    constructor() {
        /**
         * @param array
         */
        this.policyList = [];
        /**
         * @param array
         */
        this.allowActions = [];
        /**
         * @param array
         */
        this.denyActions = [];
    }

    /**
     * 只支持2级
     * @param actionName
     */
    verify(actionName) {
        let _split = actionName.split("/");
        let controller = _split[0];
        // 允许
        let allow = Arr.inArray(actionName, this.allowActions) || Arr.inArray(`${controller}/*`, this.allowActions) || Arr.inArray("*", this.denyActions);
        // 禁止
        let deny = Arr.inArray(actionName, this.denyActions) || Arr.inArray(`${controller}/*`, this.denyActions) || Arr.inArray("*", this.denyActions);
        return allow && !deny;
    }

    addPolicy(policy) {
        this.policyList.push(policy)
        this.preParse();
    }

    /**
     * 预解析
     */
    preParse() {
        for (var i = 0; i < this.policyList.length; i++) {
            // 策略
            let policy = this.policyList[i];
            // 策略语法声明
            let statement_list = policy.Statement;
            for (var j = 0; j < statement_list.length; j++) {
                // 策略语法声明 是个（声明）列表
                let statement = statement_list[j];
                if (statement.Effect === "Allow") {
                    this.allowActions = Arr.unique(Arr.merge(this.allowActions, statement.Action));
                } else if (statement.Effect === "Deny") {
                    this.denyActions = Arr.unique(Arr.merge(this.denyActions, statement.Action));
                }
            }
        }
    }

    /**
     * 用于获得一组policy获得所有的action
     * 特殊，临时写法
     * 不支持Effect判断，仅为获得action列表
     */
    static getActionList(policy){
        let actions = [];
        let statement_list = policy.Statement;
        for (var j = 0; j < statement_list.length; j++) {
            let statement = statement_list[j];
            for (var a = 0; a < statement.Action.length; a++ )
                actions.push(statement.Action[a]);
        }
        return actions
    }
    /**
     * 用于获得一组policy获得所有的module
     * 特殊，临时写法
     * 不支持Effect判断，仅为获得action列表
     */
    static getEffect(policy){
        let statement_list = policy.Statement;
        for (var j = 0; j < statement_list.length; j++) {
            let statement = statement_list[j];
            return statement.Effect
        }
    }
}

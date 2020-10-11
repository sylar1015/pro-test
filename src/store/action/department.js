export function getDepartmentList(args) {
    return {
        type: "GET_DEPARTMENT_LIST",
        payload:{label:args.label, value:args.value}
    }
}
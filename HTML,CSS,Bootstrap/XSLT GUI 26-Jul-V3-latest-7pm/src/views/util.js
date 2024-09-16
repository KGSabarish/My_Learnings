export const action = {
    DELETE: "Delete",
    REPLACE: "Replace",
};

export const type = {
    XSL: "xsl",
    XML: "xml"
};

export const elementsToRemoveFromArray = ["actions", "accuracy", "*"];

export const invalidBEColumns = {
    "xsl": ["actions", "accuracy", "*"],
    "xml": ["*"]
}
/**
 * Hard code requestId, as it is required for the report action
 * Hard code convertedCount & tibcoCount, as it is required for the accuracy calculation
 */
export const supportingColumns = {
    "xsl": [
        "requestId",
        "convertedCount",
        "tibcoCount",
        "status"
    ],
    "xml": ["requestId"]
}

export const CONVERSION_STATUS = {

    OK : { value : 'ok' , name : "Success" },
    PROGRESS : { value : 'in-prog', name : "In Progress" },
    FAIL : { value : 'fail', name : "Fail" },
    NEW : { value : 'new', name : "New" },

    getByValue: function(value) {
        let valueInLower = value.toLowerCase();
        for (let key in this) {
            if (this[key].value && this[key].value === valueInLower) {
                return this[key];
            }
        }
        throw new Error(`No enum constant with value ${value}`);
    }

}
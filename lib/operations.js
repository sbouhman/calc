/**
 * Created by sbouhman on 5/20/2019.
 */

module.exports = {


    mult: function(num1, num2, callback)
    {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        let sum = num1 * num2;
        let response_text = num1 + ' * ' + num2 + ' = ' + sum;
        callback(null, sum, response_text);
    },

    div: function(num1, num2, callback)
    {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);
        let sum = num1 / num2;
        let response_text = num1 + ' / ' + num2 + ' = ' + sum;
        callback(null, sum, response_text);
    }

};

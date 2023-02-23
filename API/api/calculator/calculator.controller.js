const express = require('express');
const { SuccessResponse, ErrorResponse } = require('../../utils/response');
const { add, divide, multiply, subtract } = require('./calculator.service');

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {Function} next
 */
module.exports.calculator = (req, res, next) => {
    const queryParams = req.query;
    let a = +queryParams.a;
    let b = +queryParams.b;
    let op = queryParams.op;

    // console.log('Controller >>>>>>');
    // console.log('Types ' + typeof a + ':' + typeof b + ':' + typeof op);

    let result;

    try {
        switch (op) {
            case '+':
            case 'add':
                result = add(a, b);
                break;
            case '-':
            case 'sub':
                result = subtract(a, b);
                break;
            case '*':
            case 'mul':
                result = multiply(a, b);
                break;
            case '/':
            case 'div':
                result = divide(a, b);
                break;
            default:
                return ErrorResponse({
                    res,
                    data: null,
                    status: 422,
                    message: "Couldn't indentify the operator",
                });
        }

        return SuccessResponse({
            res,
            data: {
                a,
                b,
                op,
                c: result,
            },
            status: 200,
            message: 'Operation successful',
        });
    } catch (error) {
        return ErrorResponse({
            res,
            data: null,
            statusCode: 400,
            message: error.message,
        });
    }
};

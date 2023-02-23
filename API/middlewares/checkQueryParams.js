const express = require('express');
const Joi = require('joi');

const { ErrorResponse } = require('../utils/response');

const schema = Joi.object({
    a: Joi.number().required(),
    b: Joi.number().required(),
    op: Joi.string()
        .valid('+', 'add', '-', 'sub', '*', 'mul', '/', 'div')
        .required(),
});

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports.checkQueryParams = (req, res, next) => {
    // console.log('My params ', req.query);
	const queryParams = req.query;
	if(queryParams?.op) {
		if(queryParams.op === ' ') {
			queryParams.op = "+";
		}
	}
    const result = schema.validate(queryParams);
    // console.log('URL' + req.url);

    // console.log('Validation Result >>>>>>>>>>');
    // console.log(JSON.stringify(result));

    /**
	 * * result structure
	 * {
	"value": {
		"a": "d",
		"b": "c",
		"op": "add"
	},
	"error": {
		"_original": {
			"a": "d",
			"b": "c",
			"op": "add"
		},
		"details": [{
			"message": "\"a\" must be a number",
			"path": ["a"],
			"type": "number.base",
			"context": {
				"label": "a",
				"value": "d",
				"key": "a"
			}
		}]
	}
}
	 */

    if (result.error) {
        const details = result.error.details[0];
        console.log('Message is ' + details.message);

        return ErrorResponse({
            res,
            statusCode: 422,
            data: { key: details.context.key, value: details.context.value },
            message: details.message,
        });
    }

    next();
};

import axios from 'axios';
import { CONSTANTS, headerGenerator } from '../../config/api-config';

export const readyStockSummaryApi0_20 = async (get_access_token: any, params: any) => {
    let response: any;
    const getHeaders = headerGenerator(get_access_token);

    const urlParams: any = [];

    Object?.keys(params).forEach((key: any) => {
        urlParams.push(`${key}=${params[key]}`);
    });

    // Construct the URL based on the URL parameters
    let url: any =
        '/api/method/sj_antique.sdk.api?version=v1&method=get_0_20_weight_ready_stock_summary_report&entity=report&';
    if (urlParams.length > 0) {
        url += `${urlParams.join('&')}`;
    }

    await axios
        .get(`${CONSTANTS.API_BASE_URL}${url}`, getHeaders)
        .then((res: any) => {
            response = res;
        })
        .catch((err: any) => {
            if (err.code === 'ECONNABORTED') {
                response = 'Request timed out';
            } else if (err.code === 'ERR_BAD_REQUEST') {
                response = 'Bad Request';
            } else if (err.code === 'ERR_INVALID_URL') {
                response = 'Invalid URL';
            } else {
                response = err;
            }
        });

    return response;
};


export const readyStockSummaryApi20_50 = async (get_access_token: any, params: any) => {
    let response: any;
    const getHeaders = headerGenerator(get_access_token);

    const urlParams: any = [];

    Object?.keys(params).forEach((key: any) => {
        urlParams.push(`${key}=${params[key]}`);
    });

    // Construct the URL based on the URL parameters
    let url: any =
        '/api/method/sj_antique.sdk.api?version=v1&method=get_20_50_weight_ready_stock_summary_report&entity=report&';
    if (urlParams.length > 0) {
        url += `${urlParams.join('&')}`;
    }

    await axios
        .get(`${CONSTANTS.API_BASE_URL}${url}`, getHeaders)
        .then((res: any) => {
            response = res;
        })
        .catch((err: any) => {
            if (err.code === 'ECONNABORTED') {
                response = 'Request timed out';
            } else if (err.code === 'ERR_BAD_REQUEST') {
                response = 'Bad Request';
            } else if (err.code === 'ERR_INVALID_URL') {
                response = 'Invalid URL';
            } else {
                response = err;
            }
        });

    return response;
};

export const readyStockSummaryApi50_100 = async (get_access_token: any, params: any) => {
    let response: any;
    const getHeaders = headerGenerator(get_access_token);

    const urlParams: any = [];

    Object?.keys(params).forEach((key: any) => {
        urlParams.push(`${key}=${params[key]}`);
    });

    // Construct the URL based on the URL parameters
    let url: any =
        '/api/method/sj_antique.sdk.api?version=v1&method=get_50_100_weight_ready_stock_summary_report&entity=report&';
    if (urlParams.length > 0) {
        url += `${urlParams.join('&')}`;
    }

    await axios
        .get(`${CONSTANTS.API_BASE_URL}${url}`, getHeaders)
        .then((res: any) => {
            response = res;
        })
        .catch((err: any) => {
            if (err.code === 'ECONNABORTED') {
                response = 'Request timed out';
            } else if (err.code === 'ERR_BAD_REQUEST') {
                response = 'Bad Request';
            } else if (err.code === 'ERR_INVALID_URL') {
                response = 'Invalid URL';
            } else {
                response = err;
            }
        });

    return response;
};


export const readyStockSummaryApi100_150 = async (get_access_token: any, params: any) => {
    let response: any;
    const getHeaders = headerGenerator(get_access_token);

    const urlParams: any = [];

    Object?.keys(params).forEach((key: any) => {
        urlParams.push(`${key}=${params[key]}`);
    });

    // Construct the URL based on the URL parameters
    let url: any =
        '/api/method/sj_antique.sdk.api?version=v1&method=get_100_150_weight_ready_stock_summary_report&entity=report&';
    if (urlParams.length > 0) {
        url += `${urlParams.join('&')}`;
    }

    await axios
        .get(`${CONSTANTS.API_BASE_URL}${url}`, getHeaders)
        .then((res: any) => {
            response = res;
        })
        .catch((err: any) => {
            if (err.code === 'ECONNABORTED') {
                response = 'Request timed out';
            } else if (err.code === 'ERR_BAD_REQUEST') {
                response = 'Bad Request';
            } else if (err.code === 'ERR_INVALID_URL') {
                response = 'Invalid URL';
            } else {
                response = err;
            }
        });

    return response;
};


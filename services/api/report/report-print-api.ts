import axios from 'axios';
import { CONSTANTS } from '@/services/config/api-config';
import { handleApiError } from '../general/error-handler';

export const dailyReportPrintApi = async (
  request: any,
  params: any
) => {
  let response: any;
  const config = {
    headers: {
      Authorization: request.token,
    },
  };
  const urlParams: any = [];

  Object?.keys(params).forEach((key: any) => {
    urlParams.push(`${key}=${params[key]}`);
  });

  let url: any =
    '/api/method/sj_antique.sdk.api?version=v1&method=print_report_daily_qty_status&entity=report&';

  if (urlParams.length > 0) {
    url += `${urlParams.join('&')}`;
  }

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${url}`, config)
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = handleApiError(err)
    });
  return response;
};

export const productReportPrintApi = async (
  request: any,
  params: any
) => {
  let response: any;
  const config = {
    headers: {
      Authorization: request.token,
    },
  };
  const urlParams: any = [];

  Object?.keys(params).forEach((key: any) => {
    urlParams.push(`${key}=${params[key]}`);
  });

  let url: any =
    '/api/method/sj_antique.sdk.api?version=v1&method=fetch_product_code_report&entity=print_report&';

  if (urlParams.length > 0) {
    url += `${urlParams.join('&')}`;
  }

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${url}`, config)
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = handleApiError(err)
    });
  return response;
};

export const itemWiseReportPrintApi = async (
  request: any,
  params: any
) => {
  let response: any;
  const config = {
    headers: {
      Authorization: request.token,
    },
  };
  const urlParams: any = [];

  Object?.keys(params).forEach((key: any) => {
    urlParams.push(`${key}=${params[key]}`);
  });

  let url: any =
    '/api/method/sj_antique.sdk.api?version=v1&method=fetch_item_report&entity=print_report&';

  if (urlParams.length > 0) {
    url += `${urlParams.join('&')}`;
  }

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${url}`, config)
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = handleApiError(err)
    });
  return response;
};

export const dailySummaryReportPrintApi = async (
  request: any,
  params: any
) => {
  let response: any;
  const config = {
    headers: {
      Authorization: request.token,
    },
  };
  const urlParams: any = [];

  Object?.keys(params).forEach((key: any) => {
    urlParams.push(`${key}=${params[key]}`);
  });

  let url: any =
    '/api/method/sj_antique.sdk.api?version=v1&method=fetch_daily_summary_report&entity=print_report&';

  if (urlParams.length > 0) {
    url += `${urlParams.join('&')}`;
  }

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${url}`, config)
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = handleApiError(err)
    });
  return response;
};

export const customerWiseReportPrintApi = async (
  request: any,
  params: any
) => {
  let response: any;
  const config = {
    headers: {
      Authorization: request.token,
    },
  };
  const urlParams: any = [];

  Object?.keys(params).forEach((key: any) => {
    urlParams.push(`${key}=${params[key]}`);
  });

  let url: any =
    '/api/method/sj_antique.sdk.api?version=v1&method=fetch_customer_wise_report&entity=print_report&';

  if (urlParams.length > 0) {
    url += `${urlParams.join('&')}`;
  }

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${url}`, config)
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = handleApiError(err)
    });
  return response;
};

export const karigarWiseReportPrintApi = async (
  request: any,
  params: any
) => {
  let response: any;
  const config = {
    headers: {
      Authorization: request.token,
    },
  };
  const urlParams: any = [];

  Object?.keys(params).forEach((key: any) => {
    urlParams.push(`${key}=${params[key]}`);
  });

  let url: any =
    '/api/method/sj_antique.sdk.api?version=v1&method=fetch_karigar_wise_report&entity=print_report&';

  if (urlParams.length > 0) {
    url += `${urlParams.join('&')}`;
  }

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${url}`, config)
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = handleApiError(err)
    });
  return response;
};

export const summaryReportPrintApi = async (
  request: any,
  params: any
) => {
  let response: any;
  const config = {
    headers: {
      Authorization: request.token,
    },
  };
  const urlParams: any = [];

  Object?.keys(params).forEach((key: any) => {
    urlParams.push(`${key}=${params[key]}`);
  });

  let url: any =
    '/api/method/sj_antique.sdk.api?version=v1&method=fetch_summary_report&entity=print_report&';

  if (urlParams.length > 0) {
    url += `${urlParams.join('&')}`;
  }

  await axios
    .get(`${CONSTANTS.API_BASE_URL}${url}`, config)
    .then((res: any) => {
      response = res;
    })
    .catch((err: any) => {
      response = handleApiError(err)
    });
  return response;
};

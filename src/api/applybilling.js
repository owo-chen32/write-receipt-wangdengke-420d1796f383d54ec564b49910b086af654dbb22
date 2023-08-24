import request from '@/utils/request'

// 查询开票列表
export const getInvoiceApi = (data) => {
    return request({
        method: 'POST',
        url: 'invoice/findInvoice',
        data
    })
}

// 开票
export const writeReceiptApi = (data) => {
    return request({
        method: 'POST',
        url: 'invoice/issue',
        data
    })
}
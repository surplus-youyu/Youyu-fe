export interface IIndexSignatureMap {
    [key: string]: any;
}

export const TASK_STATUS_MAP: IIndexSignatureMap = {
    TASK_STATUS_CREATED: '暂时无人领取',
    TASK_STATUS_PENDING: '等待完成',
    TASK_STATUS_FINISHED: '已结束'
};

export const ASSIGNMENT_STATUS_MAP: IIndexSignatureMap = {
    ASSIGNMENT_STATUS_PENDING: '未完成',
    ASSIGNMENT_STATUS_JUDGING: '等待审核',
    ASSIGNMENT_STATUS_SUCCESS: '审核通过',
    ASSIGNMENT_STATUS_FAILED: '审核未通过'
};



// error source type
export type TErrorSources = {
    path: string | number;
    message: string;
}[];


// error response type
export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
};

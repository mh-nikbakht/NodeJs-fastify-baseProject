export function paginateOpts(request:any):object {
    const { page = 1, limit = 10 } = request.query;
    const options: object = {
        page: parseInt(page),
        limit: parseInt(limit),
    }
    return options
}

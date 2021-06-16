/* 
Middleware that paginate the results and push it to the res param.
Usage example:
getting Users model paginated.
app.get('/users', paginatedResults(Users), (req,res)=>{
    res.json(res.paginatedResults)
})
*/
const paginatedResults = (model)=>{
    return async (req,res,next)=>{
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results ={}

        if(endIndex < await model.countDocuments().exec){
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if(startIndex > 0){
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        try {
            results.results = await model.find().limit(limit).skip(startIndex).exec
            res.paginatedResults = results
            next()
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
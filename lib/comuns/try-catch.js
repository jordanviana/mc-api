
export const TryCatchApi = callback => {
    return async (req, res, next) => {
        try {
          await callback(req, res, next)
        } catch (error) {
            console.log(error);
            res.status(405);
            if(typeof error == 'string'){
                res.json({ msg: error})
            } else {
                res.json({ msg: error.toString()})
            }
        }
      }
}
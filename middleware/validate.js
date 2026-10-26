
export function validate( schema, source="body"){
    return (req,res,next)=>{
        const result= schema.safeParse(req[source]??{});

        if(!result.success){
            return res.status(400).json({
                msg:"Validation Failed",
                errors: result.error.issues.map((i)=>({
                    field: i.path.join("."),
                    message: i.message,
                })),
            });

        }

        if(source==="body") req.body= result.data;
        next();
    };
}
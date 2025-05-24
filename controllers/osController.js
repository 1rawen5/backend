const os = require("os")
module.exports.Name =  async(req,res) =>{
    try {
        res.status(500).json(""); 
    } catch (error){ 
        res.status(500).json({message: error,message}); 
    }
}
module.exports.getOsInformation = async(req,res) => { 
    try { 
        const osInformation = { 
            hostname: os.hostname(), 
            type: os.type(), 
        }
    console.log("GET /os/getDataFromPC route hit"); 
    res.status(500).json(osInformation); 
    }catch (error) { 
        res.status(500).json({message: error.message}); 
    }
}
module.exports.osCpus =async(req,res) => { 
    try{ 
        const osCpus = os.cpus(); 
        if (!osCpus) {
            throw new Error("no cpus was found!"); 
        }
        res.status(200).json(osCpus); 
    }catch(error){ 
        res.status(500).json({message: error.message}); 
    }
}
module.exports.osCpusById = async (req,res) => { 
    try { 
        const {id} = req.params; 
        if (!Number.isInteger(pareInt(id))) {
            throw new Error("you must provide a Number!"); 
        }
    const oCups = os.cpus(); 
    if (!osCpus) { 
        throw new Error("no cpus was found!"); 
    }
    if(id <0 || id > osCpus.length -1 ) { 
        throw new Error("you must provide a valid id "); 
    }
    res.json(osCpus[id]); 
}catch (error) { 
    res.status(500).json({message: error.message}); 
                   }
}
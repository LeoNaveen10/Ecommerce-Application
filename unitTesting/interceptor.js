/**
 * This is where we mock the request and response
 */

const res = require("express/lib/response");


module.exports ={
    mockRequest : ()=>{
        const req = {};
/**
 * body
 * params
 * query
 */
        req.body = jest.fn().mockReturnValue(req);
        req.params = jest.fn().mockReturnValue(req);
        req.query = jest.fn().mockReturnValue(req);
        return req;
    },

    /**
     * mocked response
     */

    mockedResponse :() =>{
          /**
           * status
           * send */
          const res = {};
          res.status = jest.fn().mockReturnValue(res);
          res.send = jest.fn().mockReturnValue(res);
          return res;
    }
}
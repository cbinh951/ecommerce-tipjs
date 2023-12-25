const { CREATED } = require('../core/success.response');
const AccessService = require('../services/access.service');
class AccessController {
  signUp = async (req, res, next) => {
    /**
     * return res.status(200).json({
     * message: '',
     * metadata:
     * })
     */
    new CREATED({
      message: 'Registered OK!',
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
}

module.exports = new AccessController();

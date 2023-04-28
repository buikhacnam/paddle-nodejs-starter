import { Router } from 'express'
import { googleLogin } from '../../controllers/auth/google.js'
import { login } from '../../controllers/auth/login.js'
import { register } from '../../controllers/auth/register.js'
import { validatorRegister } from '../../middleware/validation/auth/index.js'
import { validatorLogin } from '../../middleware/validation/auth/validatorLogin.js'

const router = Router()

router.post('/login', [validatorLogin], login)
router.post('/register', [validatorRegister], register)
router.post('/google', googleLogin)

export default router

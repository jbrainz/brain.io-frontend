import * as Yup from 'yup'
import { Formik } from 'formik'
import cx from 'classnames'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'

import { AuthService } from '../../Services/Auth'
import { setUser } from '../../Reducers/Auth'
import { useEffect } from 'react'
import { getTokens } from '../../Helpers/Services'
import { Payload } from '../../Types/Token'

const Schema = Yup.object().shape({
  email: Yup.string().required('Required').email(),
  password: Yup.string().required('Required'),
})

const BasicAuth = () => {
  const initialValues = {
    email: '',
    password: '',
  }
  useEffect(() => {
    const token = getTokens()
    if (token) {
      history.push('/secure')
    }
  }, [])

  const history = useHistory()
  const dispatch = useDispatch()
  const handleSubmit = async (
    values: Payload,
    { setSubmitting, resetForm }
  ) => {
    await AuthService.login(values.email as string, values.password as string)
      .then((res: any) => {
        dispatch(setUser({ user: res }))
        history.push('/secure')
      })
      .catch((err) => {
        if (err.message) {
          toast.error(err.message)
        }
      })
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      validateOnChange={false}
      validationSchema={Schema}
    >
      {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              disabled={isSubmitting}
              value={values.email}
              onChange={handleChange('email')}
              type='email'
              placeholder='Email'
              className={cx('input input-bordered w-full', {
                'border-red-400': errors.email,
              })}
            />
            {errors.email && <div className='text-red-500'>{errors.email}</div>}
          </div>
          <div className='mt-5'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              disabled={isSubmitting}
              value={values.password}
              onChange={handleChange('password')}
              type='password'
              placeholder='Password'
              className={cx('input input-bordered w-full', {
                'border-red-400': errors.password,
              })}
            />
            {errors.email && <div className='text-red-500'>{errors.email}</div>}
          </div>
          <div className='mt-5 flex justify-end'>
            <button
              className={cx('btn btn-primary', {
                loading: isSubmitting,
              })}
              type='submit'
            >
              Login
            </button>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default BasicAuth

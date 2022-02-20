import { useEffect, useState } from 'react'
import Layout from '../../Components/Layout'
import { Formik } from 'formik'

import { AuthService } from '../../Services/Auth'

const SecurePage = () => {
  const initialValues = {
    first_name: '',
    last_name: '',
  }
  const [userDetails, setUserDetails] = useState(initialValues)

  useEffect(() => {
    AuthService.getUserDetails().then((res: any) => {
      setUserDetails(res.profile)
    })
  }, [])

  type UpdateProfile = {
    first_name: String
    last_name: String
  }

  const handleSubmit = async (
    values: UpdateProfile,
    { setSubmitting, resetForm }
  ) => {
    await AuthService.updateUserProfile(
      values.first_name as string,
      values.last_name as string
    ).then((res: any) => {
      setUserDetails(res.profile)
    })
  }

  return (
    <Layout>
      <div>this is a secure page</div>
      <div className='mt-10'>
        <h4 className='font-bold'>User Details</h4>
        <h5 className='mt-5'>First name: {userDetails?.first_name}</h5>
        <h5 className='mt-5'>Last name: {userDetails?.last_name}</h5>
      </div>
      <div className='mt-10'>
        <h4 className='font-bold'>Update your Profile</h4>
        <Formik
          initialValues={userDetails}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validateOnChange={false}
        >
          {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <div className='mt-2'>
                <label className='label'>
                  <span className='label-text'>First name</span>
                </label>
                <input
                  value={values.first_name}
                  onChange={handleChange('first_name')}
                  type='text'
                  placeholder='First name'
                  className={'input input-bordered'}
                />
                <label className='label'>
                  <span className='label-text'>Last name</span>
                </label>
                <input
                  value={values.last_name}
                  onChange={handleChange('last_name')}
                  type='text'
                  placeholder='Last name'
                  className={'input input-bordered'}
                />
                <div className='mt-5 flex justify-start'>
                  <button className={'btn btn-primary'} type='submit'>
                    Update profile
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default SecurePage

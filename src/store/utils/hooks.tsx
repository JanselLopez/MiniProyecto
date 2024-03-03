import { useSelector } from 'react-redux'
import { RootState } from '../rootReducer'
import { useGetUserQuery } from '../api/slices/users'
import { useEffect, useState } from 'react'
import { metaData } from '@/utils/get-meta-data'

export const useCollegeId = () => {
    const {
        college: { collegeId },
    } = useSelector((state: RootState) => state.college)
    return collegeId
}

export const useCollegePermissions = () => {
    const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));
    const {data} = useGetUserQuery(userId)
    useEffect(() => {
        window.addEventListener('storage', () => {
          const id = localStorage.getItem('userId')
          setUserId(id);
        })
      }, []);
    return metaData(data,"_colleges")
}

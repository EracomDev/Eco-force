import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './Pages/DashboardPage/DashboardPage';
import Reward from './Pages/Reward/Reward';
import Profile from './Pages/Profile/Profile';
import WithdrawalDeposit from './Pages/WithdrawalDeposit/WithdrawalDeposit';
import Support from './Pages/Support/Support'
import GenerationTeam from './Pages/GenerationTeam/GenerationTeam';
import Incomes from './Pages/Incomes/Incomes';
import DirectTeam from './Pages/DirectTeam/DirectTeam';
import DirectIncome from './Pages/Incomes/DirectIncome';
import SignupLevelIncome from './Pages/Incomes/SignupLevelIncome';
import RoiIncome from './Pages/Incomes/RoiIncome';
import RoiLevelIncome from './Pages/Incomes/RoiLevelIncome';
import SignupIncome from './Pages/Incomes/SignupIncome';
import RewardIncome from './Pages/Incomes/RewardIncome';
import Deposit from './Pages/Deposit/Deposit';
const NavPages = () => {
  return (
      <Routes>
          <Route path='/' element={<DashboardPage/>}></Route>
          <Route path='/reward' element={<Reward/>}></Route>
          <Route path='/proflie' element={<Profile/>}></Route>
          <Route path='/withdrawal_deposit' element={<WithdrawalDeposit/>}></Route>
          <Route path='/support' element={<Support/>}></Route>
          <Route path='/direct_team' element={<DirectTeam/>}></Route>
          <Route path='/generation_team' element={<GenerationTeam/>}></Route>
          <Route path='/direct_income' element={<DirectIncome/>}></Route>
          <Route path='/Signup_level_income' element={<SignupLevelIncome/>}></Route>
          <Route path='/roi_income' element={<RoiIncome/>}></Route>
          <Route path='/roi_level_income' element={<RoiLevelIncome/>}></Route>
          <Route path='/signup_income' element={<SignupIncome/>}></Route>
          <Route path='/reward_income' element={<RewardIncome/>}></Route>
          <Route path='/deposit' element={<Deposit/>}></Route>

      </Routes>
  )
}

export default NavPages
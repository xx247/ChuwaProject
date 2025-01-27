import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getEmployeeProfileById, getEmployeeProfiles, 
    getOnboardingApplications, getEmailRegistrations, 
    getOnboardingApplication, getInProgressEmployeeVisaStatuses, getAllEmployeeVisaStatuses } from '../Services/hr';

export const fetchEmployeeProfileById = createAsyncThunk(
    'HREmployeeApplication/fetchEmployeeProfileById',
    async (profile_id) => {
        console.log(profile_id);
      const data = await getEmployeeProfileById(profile_id);
      console.log(data);
      return data;
    }
);

export const fetchEmployeeProfiles = createAsyncThunk(
    'HREmployeeApplication/fetchEmployeeProfiles',
    async () => {
      const data = await getEmployeeProfiles();
      return data;
    }
);

export const fetchOnboardingApplications = createAsyncThunk(
    'HREmployeeApplication/fetchOnboardingApplications',
    async (status) => {
      const data = await getOnboardingApplications(status);
      return {status: status, data: data};
    }
);

export const fetchEmailRegistrations = createAsyncThunk(
    'HREmployeeApplication/fetchEmailRegistrations',
    async () => {
      const data = await getEmailRegistrations();
      return data;
    }
);

export const fetchOnboardingApplication = createAsyncThunk(
    'HREmployeeApplication/fetchOnboardingApplication',
    async (id) => {
      const data = await getOnboardingApplication(id);
      return data;
    }
);

export const fetchInProgressEmployeeVisaStatuses = createAsyncThunk(
    'HREmployeeApplication/fetchInProgressEmployeeVisaStatuses',
    async () => {
      const data = await getInProgressEmployeeVisaStatuses();
      return data;
    }
);

export const fetchAllEmployeeVisaStatuses = createAsyncThunk(
    'HREmployeeApplication/fetchAllEmployeeVisaStatuses',
    async () => {
      const data = await getAllEmployeeVisaStatuses();
      return data;
    }
);

export const HREmployeeApplicationSlice = createSlice({
  name: 'HREmployeeApplication',
  initialState: {
    employeeProfile: {},
    employeeProfiles: [],
    employeeProfilesSearched: [],
    onboardingApplications: {},
    onboardingApplication: {},
    emailRegistrations: [],
    inProgressEmployeeVisaStatuses: [],
    allEmployeeVisaStatuses: {},
    allEmployeeVisaStatusesSearched: {},
  },
  reducers: {
    searchEmployeeVisaStatuses: (state, action) => {
        let searchedProfiles = {};
        Object.keys(state.allEmployeeVisaStatuses).forEach((person) => {
          if (person.toLowerCase().includes(action.payload)) {
              searchedProfiles[person] = state.allEmployeeVisaStatuses[person];
          }
        })
        state.allEmployeeVisaStatusesSearched = searchedProfiles;
      },
      searchEmployeeProfiles: (state, action) => {
        const name = action.payload;
        state.employeeProfilesSearched = state.employeeProfiles.filter((profile) => {
            return profile.firstName.toLowerCase().includes(name) || 
            profile.lastName.toLowerCase().includes(name) || profile.preferredName.toLowerCase().includes(name);
          })
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeProfileById.fulfilled, (state, action) => {
        state.employeeProfile = action.payload;
      })
      .addCase(fetchEmployeeProfiles.fulfilled, (state, action) => {
        state.employeeProfiles = action.payload;
        state.employeeProfilesSearched = action.payload;
      })
      .addCase(fetchOnboardingApplications.fulfilled, (state, action) => {
        state.onboardingApplications[action.payload.status] = action.payload.data;
      })
      .addCase(fetchEmailRegistrations.fulfilled, (state, action) => {
        state.emailRegistrations = action.payload;
      })
      .addCase(fetchOnboardingApplication.fulfilled, (state, action) => {
        state.onboardingApplication = action.payload;
      })
      .addCase(fetchInProgressEmployeeVisaStatuses.fulfilled, (state, action) => {
        state.inProgressEmployeeVisaStatuses = action.payload;
      })
      .addCase(fetchAllEmployeeVisaStatuses.fulfilled, (state, action) => {
        state.allEmployeeVisaStatuses = action.payload;
        state.allEmployeeVisaStatusesSearched = action.payload;
      })
  },
})

export const { searchEmployeeVisaStatuses, searchEmployeeProfiles } = HREmployeeApplicationSlice.actions

export const HREmployeeApplicationReducer = HREmployeeApplicationSlice.reducer
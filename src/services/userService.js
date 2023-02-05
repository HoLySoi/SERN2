import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", {
    email: userEmail,
    password: userPassword,
  });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  // console.log("check data from service:", data);
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  // console.log("check data from service:", data);
  return axios.put("/api/edit-user", inputData);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit = 10, offset = 0, filter = "") => {
  return axios.get(
    `/api/top-doctor-home?filter=${filter}&limit=${limit}&offset=${offset}`
  );
};

const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};

const getDoctorsSchedule = (limit = 10, offset = 0, filter = "") => {
  return axios.get(
    `/api/doctors-schedule?filter=${filter}&limit=${limit}&offset=${offset}`
  );
};

const saveDetailDoctorService = (data) => {
  return axios.post(`/api/save-infor-doctors`, data);
};

const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

const createNewSpecialty = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};

const getAllSpecialty = (limit = 10, offset = 0, filter = "") => {
  return axios.get(
    `/api/get-specialty?filter=${filter}&limit=${limit}&offset=${offset}`
  );
};

const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const deleteSpecialty = (Id) => {
  return axios.delete("/api/delete-specialty", {
    data: {
      id: Id,
    },
  });
};

const createNewHandbook = (data) => {
  return axios.post(`/api/create-new-handbook`, data);
};

const getAllHandbook = () => {
  return axios.get(`/api/get-handbook`);
};

const getAllDetailHandbookById = (data) => {
  return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`);
};

const deleteHandbook = (Id) => {
  return axios.delete("/api/delete-handbook", {
    data: {
      id: Id,
    },
  });
};

const editHandbook = (inputData) => {
  return axios.put("/api/edit-handbook", inputData);
};
const editSpecialty = (inputData) => {
  return axios.put("/api/edit-specialty", inputData);
};
const editClinic = (inputData) => {
  return axios.put("/api/edit-clinic", inputData);
};

const createNewClinic = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};

const getAllClinic = (limit = 10, offset = 0, filter = "") => {
  return axios.get(
    `/api/get-clinic?filter=${filter}&limit=${limit}&offset=${offset}`
  );
};

const getAllDetailClinicById = (data) => {
  return axios.get(
    `/api/get-detail-clinic-by-id?id=${data.id}&location=${data.location}`
  );
};

const deleteClinic = (Id) => {
  return axios.delete("/api/delete-clinic", {
    data: {
      id: Id,
    },
  });
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const postSendRemedy = (data) => {
  return axios.post(`/api/send-remedy`, data);
};

const searchAll = (search = "") => {
  return axios.get(`/searchAll?search=${search}`);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getAllDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getAllDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
  createNewHandbook,
  getAllHandbook,
  getAllDetailHandbookById,
  deleteHandbook,
  editHandbook,
  editSpecialty,
  editClinic,
  deleteSpecialty,
  deleteClinic,
  searchAll,
  getDoctorsSchedule,
};

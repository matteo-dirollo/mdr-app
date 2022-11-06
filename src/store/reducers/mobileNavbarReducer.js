const OPEN_MOBILE_NAVBAR = 'OPEN_MOBILE_NAVBAR';
const CLOSE_MOBILE_NAVBAR = 'CLOSE_MOBILE_NAVBAR';

export function openMobileNavBar(payload) {
  return {
    type: OPEN_MOBILE_NAVBAR,
    payload,
  };
}

export function closeModal() {
  return {
    type: CLOSE_MOBILE_NAVBAR,
  };
}

const initialState = null;

export default function mobileNavbarReducer(state = initialState, { type, payload }) {
  switch (type) {
    case OPEN_MOBILE_NAVBAR:
      const { modalType, modalProps } = payload;
      return { modalType, modalProps };
    case CLOSE_MOBILE_NAVBAR:
      return null;
    default:
      return state;
  }
}
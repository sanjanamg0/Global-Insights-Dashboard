import styled from "styled-components";

/* ================= MAIN CONTAINER ================= */

export const Container = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
`;

/* ================= FORM CONTAINERS ================= */

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  transition: all 0.6s ease-in-out;

  ${({ active }) =>
    active &&
    `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  `}
`;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  left: 0;
  width: 50%;
  z-index: 2;
  transition: all 0.6s ease-in-out;

  ${({ active }) =>
    active &&
    `
    transform: translateX(100%);
  `}
`;

/* ================= FORM ================= */

export const Form = styled.form`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const Button = styled.button`
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  margin-top: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
`;

export const GhostButton = styled(Button)`
  background-color: transparent;
  border-color: #ffffff;
  margin-top: 20px;
`;

/* ================= OVERLAY ================= */

export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  z-index: 100;
  transition: transform 0.6s ease-in-out;

  ${({ active }) =>
    active &&
    `
    transform: translateX(-100%);
  `}
`;

export const Overlay = styled.div`
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transition: transform 0.6s ease-in-out;

  ${({ active }) =>
    active &&
    `
    transform: translateX(50%);
  `}
`;

/* ================= OVERLAY PANELS (FIXED) ================= */

export const OverlayPanel = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* ✅ PERFECT CENTER */
  padding: 0 40px;
  text-align: center;
  background: linear-gradient(135deg, #8A2387 0%, #E94057 50%, #F27121 100%);
`;

export const LeftOverlayPanel = styled(OverlayPanel)`
  left: 0;
`;

export const RightOverlayPanel = styled(OverlayPanel)`
  right: 0;
`;

/* ================= TEXT ================= */

export const Paragraph = styled.p`
  font-size: 14px;
  font-weight: 100;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
`;
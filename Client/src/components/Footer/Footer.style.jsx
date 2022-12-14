import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #2d323e;
  gap: 1rem;
  text-align: center;
  margin-top: 1rem;
  padding-top: 2rem;
  padding-bottom: 1rem;
  color: white;
`;

export const SocialWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  img {
    width: 2.3rem;
    height: 2.3rem;
    transition: transform 0.3s;
    :hover {
      transform: scale(1.2, 1.2);
    }
    :active {
      transform: scale(0.9, 0.9);
    }
  }
`;

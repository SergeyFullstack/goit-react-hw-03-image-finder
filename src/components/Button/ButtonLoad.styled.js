import styled from 'styled-components';

export const ButtonLoad = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 8px 16px;
  border-radius: 2px;
  background-color: #3f51b5;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  & svg {
    margin-left: 10px;
  }

  & .three-wrapper {
    margin-top: 0;
  }
  &:hover,
  &:focus {
    background-color: #303f9f;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

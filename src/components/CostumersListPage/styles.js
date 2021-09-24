import styled from 'styled-components'

export const Container = styled.div`
  > ul {
    padding: 40px;
    display: flex;
    flex-direction: row;
    list-style-type: none;
    flex-wrap: wrap;

    > li {
      width: 50%;
      padding: 10px;

      > div {
        background-color: var(--color-tertiary);
        display: flex;
        flex-direction: column;
        padding: 40px 20px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        cursor: pointer;

        &:hover {
          background-color: var(--color-secondary);
        }

        > span {
          font-weight: bold;
          font-size: 32px;
        }
      }
    }
  }
`

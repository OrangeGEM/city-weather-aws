import styled from "styled-components";

export const Input = styled.input`
    width: 250px;
    height: 40px;

    padding: 3px;
    box-sizing: border-box;
    border: 3px solid grey;

    font-size: 18px;
`;

export const SubmitButton = styled.button`
    width: 100px;
    height: 40px;

    background-color: #FF6840;
    color: white;

    box-sizing: border-box;
    border: 2px solid grey;

    display: flex;
    justify-content: center;
    align-items: center;
    
    font-size: 16px;

    cursor: pointer;
`;

export const Container = styled.div`
    width: 100%;
    height: 500px;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ContentContainer = styled.div`
    width: 500px;
    height: 250px;
`;

export const InputContainer = styled.form`
    display: flex;
    flex-direction: row;

    margin-bottom: 30px;
`

export const ResultsContainer = styled.div`
    margin-top: 20px;
    font-weight: 400;

    padding: 0px 4px; 

    width: 100%;
    height: 200px;

    border: 1px solid black;
    box-sizing: border-box;
`;

export const TextPart = styled.div`
    padding: 0;
    margin: 0;
`;
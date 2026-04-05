'use client';
import {useState} from "react";
import createURL from "@/lib/createURL";
import styled from "styled-components";

const StyledInput = styled.input`
    background: ghostwhite;
    text-align: center;
    border-radius: 1vw;
    border: 1px solid black;
    margin: auto;
    margin-bottom: 2%;
    width: 100%;
`;

const StyledInput2 = styled(StyledInput)`
    width: 75%;
    text-align: left;
    padding-left: 2%;
`;

const StyledButton = styled.button`
    border-radius: 1vw;
    border: 1px solid black;
    padding: 1%;
    width: 25%;
    margin: 3% auto;
    background: ghostwhite;
    font: calc(2px + 1vw) "Comic Sans MS";
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 5% auto;
    border: 1px solid black;
    border-radius: 1vw;
    padding: 1% 3% 3% 3%;
    width: 30%;
    background: #869ef1;
`;

const AliasDiv = styled.div`
    display: flex;
    flex-direction: row;
    border: none;
`;

const StyledP = styled.p`
    font: calc(2px + 0.8vw) "Comic Sans MS";
    text-align: center;
    margin-bottom: 2%;
`;

const DisplayDiv = styled(InputWrapper)<{ $active: boolean }>`
    display: ${({ $active }) => ($active ? "flex" : "none")}
`;

const DisplayDiv1 = styled(InputWrapper)<{ $active: boolean }>`
    display: ${({ $active }) => ($active ? "flex" : "none")}
`;

const StyledH1 = styled.h1`
    font: calc(2px + 1.5vw) "Comic Sans MS";
    text-align: center;
    margin-bottom: 8%;
`;

export default function NewUrlForm() {
    const [shorturl, setShorturl] = useState('');
    const [longurl, setLongurl] = useState('');
    const [showValid, setShowValid] = useState(false);
    const [showInvalid, setShowInvalid] = useState(false);

    return (

        <form onSubmit={(e) => {
            e.preventDefault();
            createURL(shorturl, longurl)
                .then(url => {
                    if(url !== null) {
                        setShowValid(true);
                        setShowInvalid(false);
                    } else {
                        setShowInvalid(true);
                        setShowValid(false);
                    }
                })
            .catch(err => {console.error(err)});
        }}>
            <InputWrapper>
                <StyledH1>Shorten any URL Here!</StyledH1>
                <label htmlFor="website"><StyledP>Enter the full link you would like to shorten!</StyledP></label>
                <StyledInput id="website" type="text" placeholder="Ex. https://www.google.com" value={longurl} onChange={(e) => setLongurl(e.target.value)}></StyledInput>
                <label htmlFor="alias"><StyledP>Enter the Shortened Alias!</StyledP></label>
                <AliasDiv>
                    <StyledP>{window.location.origin}/</StyledP>
                    <StyledInput2 id="alias" type="text" placeholder="Ex. resume" value={shorturl} onChange={(e) => setShorturl(e.target.value)}></StyledInput2>
                </AliasDiv>
                <StyledButton type="submit">Shorten</StyledButton>
            </InputWrapper>
            <DisplayDiv $active={showValid}>
                <StyledH1>Your shortened URL is now available!</StyledH1>
                <StyledP>You can access it at</StyledP>
                <StyledP>{window.location.origin}/{shorturl}</StyledP>
            </DisplayDiv>
            <DisplayDiv1 $active={showInvalid}>
                <StyledH1>Your shortened URL could not be made</StyledH1>
                <StyledP>The alias either already exists in the database, or leads to an invalid link.</StyledP>
            </DisplayDiv1>

        </form>

    );
}

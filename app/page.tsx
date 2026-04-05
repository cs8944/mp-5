import styled from "styled-components";
import NewUrlForm from "@/components/NewUrlForm";

const Title = styled.h1`
    font: bold calc(2px + 2vw) "Comic Sans MS";
    border-radius: 1vw;
    border: 1px solid black;
    background: ghostwhite;
    width: 25%;
    text-align: center;
    margin: 2% auto 0;
`;

const HomeWrapper = styled.div`
    background-color: burlywood;
    height: 100vh;
`;

export default function Home() {

    return (
      <HomeWrapper>
        <Title>URL Shortener</Title>
          <NewUrlForm />
      </HomeWrapper>
  );
}

import React, { useState } from "react";
import {
  useApolloClient,
  useQuery,
  useMutation,
  useLazyQuery,
} from "@apollo/client";
import gql from "graphql-tag";
//import { useQuery, useMutation } from "@apollo/react-hooks";
import PetsList from "../components/PetsList";
import NewPetModal from "../components/NewPetModal";
import Loader from "../components/Loader";

const GET_PETS = gql`
  query getPets {
    pets {
      id
      name
      type
      img
    }
  }
`;

const NEW_PETS = gql`
  mutation CreateAPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      id
      name
      type
      img
    }
  }
`;

export default function Pets() {
  const [modal, setModal] = useState(false);
  const { loading, error, data } = useQuery(GET_PETS);
  const [createPet, newPet] = useMutation(NEW_PETS, {
    update(cache, { data: { addPet } }) {
      const data = cache.readQuery({ query: GET_PETS });
      cache.writeQuery({
        query: GET_PETS,
        data: { pets: [addPet, data.pets] },
      });
    },
  });

  const onSubmit = (input) => {
    setModal(false);
    createPet({
      variables: { newPet: input },
      optimisticResponse: {
        __typename: "Mutation",
        addPet: {
          __typename: "Pet",
          id: Math.floor(Math.random() * 10000 + ""),
          name: input.name,
          type: input.type,
          img: "https://via.placeholder.com/300",
        },
      },
    });
  };

  if (loading) {
    return <Loader />;
  }

  if (error || newPet.error) {
    return <p>Eroor ococured!!</p>;
  }

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />;
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  );
}

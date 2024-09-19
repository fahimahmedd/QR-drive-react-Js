import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ReactSession } from "react-client-session";
import { getJournalsUrl } from "../api/Api";
const NoteItem = () => {
  return (
    <>
      <div className="note_item">
        <div className="note_title">Fahim Ahmed</div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          aperiam optio provident assumenda culpa. Alias, ab quod quaerat iste.
        </p>
      </div>
    </>
  );
};

export default NoteItem;

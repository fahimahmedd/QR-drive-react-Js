import { Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import JournalListItem from "../journalEditorBody/JournalListItem";
import parser from "html-react-parser";
import JournalEditorLeftBar from "../journalEditorBody/JournalEditorLeftBar";
import JournalSaveItem from "../journalBody/JournalSaveItem";

const JournalAdendamPreviewBody = () => {
  const location = useLocation();
  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var today = new Date(location.state.data.created_at);
  var createDate = today.toLocaleDateString("en-US", options);
  var today = new Date(location.state.data.updated_at);
  var updatedDate = today.toLocaleDateString("en-US", options);

  return (
    <>
      <div className="Journal_preview">
        <div className="journal_preview_body">
          <div className="journal_preview_item">
            <div className="journal_heading">{location.state.data.title}</div>
            <div className="journal_others_info">
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className="info_left">Created date</div>
                </Grid>
                <Grid item xs={10}>
                  <div className="info_right">: {createDate}</div>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <div className="info_left">Last Modified</div>
                </Grid>
                <Grid item xs={10}>
                  <div className="info_right">: {updatedDate}</div>
                </Grid>
              </Grid>
            </div>
            <div className="jurnal_Text_Content">
              {parser(location.state.data.details)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JournalAdendamPreviewBody;

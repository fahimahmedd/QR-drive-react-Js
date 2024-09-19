import { Grid } from "@mui/material";
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import JournalListItem from "../journalEditorBody/JournalListItem";
import parser from "html-react-parser";
import JournalEditorLeftBar from "../journalEditorBody/JournalEditorLeftBar";
import JournalSaveItem from "../journalBody/JournalSaveItem";
const JournalPreviewBody = React.forwardRef((props, ref) => {
  const location = useLocation();
  const navigate = useNavigate();

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var today = new Date(location.state.data.created_at);
  var createDate = today.toLocaleDateString("en-US", options);
  var today = new Date(location.state.data.updated_at);
  var updatedDate = today.toLocaleDateString("en-US", options);

  const detailsFilter = location.state.data.details
    .replace(/<[^>]*>?/gm, "")
    .slice(0, 250);
  const details = detailsFilter.replace(/\&nbsp;/g, "");

  const handleAdendamDetails = (data) => {
    navigate("/journal-adendam-preview", {
      state: {
        data: data,
      },
    });
  };

  return (
    <>
      <div className="Journal_preview" ref={ref}>
        <div className="journal_preview_body">
          <div className="journal_preview_item">
            <div className="journal_heading">{location.state.data.title}</div>
            <div className="journal_others_info">
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <div className="info_left">Created date</div>
                </Grid>
                <Grid item xs={8}>
                  <div className="info_right">: {createDate}</div>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <div className="info_left">Last Modified</div>
                </Grid>
                <Grid item xs={8}>
                  <div className="info_right">: {updatedDate}</div>
                </Grid>
              </Grid>
            </div>
            <div className="jurnal_Text_Content">
              {parser(location.state.data.details)}
            </div>
          </div>
          <div className="adendam_list">
            <Grid container spacing={2}>
              {location.state.data.adendam.length > 0 &&
                location.state.data.adendam.map((data, key) => {
                  var today = new Date(data.created_at);
                  var date = today.toLocaleDateString("en-US", options);
                  const detailsFilter = data.details
                    .replace(/<[^>]*>?/gm, "")
                    .slice(0, 50);
                  const details = detailsFilter.replace(/\&nbsp;/g, "");
                  return (
                    <Grid
                      item
                      lg={3}
                      xs={12}
                      onClick={(e) => handleAdendamDetails(data)}
                      key={key}
                    >
                      <div className="journal_list_item">
                        <div className="journal_creat_date">{date}</div>
                        <div className="journal_Title">{data.title}</div>
                        <div className="journal_text">{`${details} ...`}</div>
                      </div>
                    </Grid>
                  );
                })}
            </Grid>
          </div>
        </div>
        <JournalEditorLeftBar ref={ref} />
      </div>
    </>
  );
});

export default JournalPreviewBody;

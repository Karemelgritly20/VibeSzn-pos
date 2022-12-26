import React from "react";
import styles from "./Attributes.module.css";
import DOMPurify from "dompurify";




function Attributes({ data, item_attributes }) {
  const showData = function (item_attributes) {
    var attributes = [];
    var output = "";
    item_attributes.forEach((attribute_option) => {
      if (!attributes.includes(attribute_option.attr_id)) {
        if (attributes.length != 0) {
          output += `</Grid>
          </div>`;
        }
        attributes.push(attribute_option.attr_id);
        if (attribute_option.attr_type === "1") {
          output +=
            `<div>
            <p>` +
            attribute_option.attr_name +
            `</p>
            <input min={1} max={10} />
          </div>`;
          return;
        }
        output +=
          `<p>` +
          attribute_option.attr_name +
          `</p> <br/>
          <br/>
        <div className={styles.colorsBtns}>
          <Grid>
          <Grid item>
          <Button variant="outlined" >` +
          attribute_option.attr_option_name +
          `</Button>
          </Grid>`;
      } else {
        output +=
          `<Grid item>
        <button variant="outlined" >` +
          attribute_option.attr_option_name +
          `</button>
        </Grid>`;
      }
    });
    if (item_attributes.length != 0) {
      output += `</Grid>
      </div>`;
    }
    return output;
  };

  return (
    <>
      <form>
        <div className={styles.attributeBtnContainer}>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(showData(item_attributes)),
            }}
          />
        </div>
      </form>
    </>
  );
}

export default Attributes;

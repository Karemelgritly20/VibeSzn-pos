const showData = function(item_attributes){
    var attributes = [];
    var output = "";
    item_attributes.forEach(attribute_option => {
      if(!attributes.includes(attribute_option.attr_id)){
        if(attributes.length !=0){
          output += `</Grid>
          </div>`;
        }
        attributes.push(attribute_option.attr_id);
        
        output += `<Typography variant='body1' >`+attribute_option.attr_name+`</Typography> <br/>
        <div className={styles.colorsBtns}>
    
          <Grid container>
          <Grid item>
          <Button variant="outlined" >`+attribute_option.attr_option_name+`</Button>
          </Grid>`;
      }else{
        output +=`<Grid item>
        <Button variant="outlined" >`+attribute_option.attr_option_name+`</Button>
        </Grid>`;
      }
    });
    if(item_attributes.length != 0){
      output += `</Grid>
      </div>`;
    }
    return output;
  }
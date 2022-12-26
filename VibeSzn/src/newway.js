const RenderAttributes = () => {
    const usedAttributes = [];

    return data?.map((val) => {
      if (usedAttributes.includes(val?.attr_id)) {
        if (val?.attr_type === "1") {
          return <input />;
        }

        return (
          <button
            className="d-block"
            onClick={() => console.log(val.attr_option_name)}
          >
            {val?.attr_option_name}
          </button>
        );
      } else {
        usedAttributes.push(val?.attr_id);

        if (val?.attr_type === "1") {
          return (
            <>
              <h1>{val?.attr_name}</h1>
              <input className="d-block" />
            </>
          );
        }

        return (
          <div className="d-block">
            <h1 className="d-block" style={{ color: "red" }}>
              {val?.attr_name}
            </h1>
            <button onClick={() => console.log(val.id, val.attr_option_name)}>
              {val?.attr_option_name}
            </button>
          </div>
        );
      }
    });
  };


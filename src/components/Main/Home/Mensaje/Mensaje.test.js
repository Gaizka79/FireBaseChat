import React from "react";
import { shallow } from "enzyme";
import Mensaje from "./Mensaje";

describe("Mensaje", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Mensaje />);
    expect(wrapper).toMatchSnapshot();
  });
});

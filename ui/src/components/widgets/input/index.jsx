import { useEffect, useState } from "react";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

const commonCls =
  "text-md font-medium box-border border-b-2 border-b-indigo-500 p-2 outline-none transition-all";

const Input = ({ rules, ...props }) => {
  return <input className={`${commonCls}`} {...props} />;
};

const Password = ({
  rules = [],
  onChange = () => {},
  forgotPassword = () => {},
  ...props
}) => {
  // Hide or show password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((show) => !show);

  // Show strong password rules in points
  const [password, setPassword] = useState(null);

  let messages = [];
  if (password && rules.length > 0) {
    rules.forEach((rule) => {
      // rule types: regex match, length, required
      if (rule.type === "required") return;

      let matchStatus;
      if (rule.type === "match") {
        const matches = password.match(rule.pattern);
        matchStatus = matches && matches.length >= rule.appears;
      } else if (rule.type === "length") {
        matchStatus = password.length >= rule.len;
      }

      messages.push({
        message: rule.message,
        status: matchStatus,
      });
    });
  }

  useEffect(() => {
    onChange(password);
  }, [password]);

  return (
    <div className="flex flex-col gap-2">
      <div className={`${commonCls} flex`}>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full outline-none"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          required={rules.findIndex((rule) => rule.type === "required") > -1}
          {...props}
        />
        <span
          // className="flex items-center justify-around"
          onClick={handleShowPassword}
        >
          <Icon
            className="cursor-pointer"
            icon={showPassword ? eye : eyeOff}
            size={16}
          />
        </span>
      </div>
      <div className="flex items-baseline justify-between">
        <ul>
          {messages.map((message) => (
            <li
              className={`ml-5 list-disc text-sm font-medium ${message.status ? "text-green-500" : "text-red-500"}`}
            >
              {message.message}
            </li>
          ))}
        </ul>
        <button
          className="text-md border-b-2 border-b-transparent font-semibold text-indigo-500 transition-all hover:border-b-2 hover:border-b-indigo-500"
          onClick={forgotPassword}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export { Input, Password };

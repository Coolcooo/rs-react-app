type ErrorDescriptionProps = {
  description: string;
};
function ErrorDescription({ description }: ErrorDescriptionProps) {
  return <div>{description}</div>;
}

export default ErrorDescription;

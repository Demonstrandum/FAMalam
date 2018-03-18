FAM::Machine::CPU.class_eval do
  def cpu_output out, ascii
    ascii == :PLAIN ? out.to_s : out.chr
  end

  def cpu_input
    @inputting = true
  end
end
